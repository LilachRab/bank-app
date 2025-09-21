const tokenBlacklist = new Set<string>();

export const addTokenToBlacklist = async (token: string) => {
    tokenBlacklist.add(token);
};

export const isTokenBlacklisted = async (token: string) => {
    return tokenBlacklist.has(token);
};

export const removeTokenFromBlacklist = async (token: string) => {
    if (await isTokenBlacklisted(token)) {
        tokenBlacklist.delete(token);
    }
};
