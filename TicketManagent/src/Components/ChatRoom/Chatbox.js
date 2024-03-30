import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../../FirebaseHelpers/firebase-config";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { CHATS } from "../../FirebaseHelpers/ApiInterface";
import { createPath, useParams } from "react-router-dom";
import { databasePath } from "../../Helper/helper";

export const ChatBox = () => {
    const { tokenId, currentUserId } = useParams();
    console.log(tokenId);
    console.log(currentUserId);
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    const path = databasePath(CHATS, tokenId);
    console.log(tokenId);
    console.log(currentUserId);
    useEffect(() => {
        const q = query(
            collection(db, path),
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <main className="">
            <div className="bg-green-300 p-3 scroll-m-9 h-96  overflow-y-scroll scroll-smooth focus:scroll-auto">
                {messages?.map((message,index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <div>
                <span ref={scroll}></span>
                <SendMessage path={path} scroll={scroll} currentUserId={currentUserId} />
            </div>
        </main>
    );
};
