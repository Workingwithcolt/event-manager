import CardRow from "../GenericComponents/CardRow";

export const IssueDetail = ({ item }) => {

    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
                <img src={item.Document} alt="Uploaded"
                    className={"block border border-1  border-info-subtle  rounded max-h-30 max-w-full "}
                ></img>
                <ul>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.Subject}
                    </h5>
                    <CardRow
                        name={"status"}
                        value={item.status}
                    />
                    <div className="font-bold">Description</div>
                    <p className="font-normal text-gray-400 dark:text-gray-400 ">
                        {item.Description}
                    </p>
                </ul>
            </div>
        </section >
    )
}