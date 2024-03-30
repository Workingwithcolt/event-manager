export const ADMIN_USER_LEVEL_ID = "AdminLevelID";
export const ADMIN_USER_LEVEL_NAME = "Admin";

export const USER_USER_LEVEL_ID = "UserLevelID";
export const USER_USER_LEVEL_NAME = "User";

export const ASSISTAND_LEVEL_NAME = "Assistant";
export const ASSISTANT_LEVEL_ID = "AssistantLevelID";

export const ACCEPTED = "accepted";
export const PENDING = "pending";
export const REJECTED = "Rejected";


export function deepCopyObject(fromObject) {
    return JSON.parse(JSON.stringify(fromObject));
}

export const returnCurrentCompany = async (endpoints, uid) => {
    try {
        let CompanyInfo = await endpoints.Company.getDocument(uid);
        return CompanyInfo;
    } catch (e) {
        //
        // return {}
    }
}

export const checkAdmin = (currentAcces = []) => {
    return currentAcces.some(item => item.levelID === ADMIN_USER_LEVEL_ID)
}

export const checkAssistant = (currentAcces) => {
    return currentAcces.some(item => item.levelID === ASSISTANT_LEVEL_ID);
}




export const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onloadend = function () {
            var pdfBase64Data = reader.result;
            resolve(pdfBase64Data);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
};

export const databasePath = (root, id) => {
    return root + "/" + id + "/chat"
}