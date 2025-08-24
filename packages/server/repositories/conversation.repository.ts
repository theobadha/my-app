// Implementation detail
const conversations = new Map<string, string>();

// export an object called conversationRepository
export const conversationRepository = {
    getLastResponseId: (conversationId: string) =>
        conversations.get(conversationId),
    setLastResponseId: (conversationId: string, responseId: string) =>
        conversations.set(conversationId, responseId),
};
