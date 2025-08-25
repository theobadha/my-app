import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { useRef, useState } from 'react';

type FormData = {
    prompt: string;
};

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const conversationId = useRef(crypto.randomUUID()); // Replace with actual conversation ID
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = async ({ prompt }: FormData) => {
        setMessages([...messages, prompt]);
        reset();
        const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
        });
        setMessages([...messages, data.message]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="flex flex-col gap-2 items-end border-2 p-4"
            >
                <textarea
                    className="w-full border-0 focus:outline-0 resize-none"
                    placeholder="Ask anything"
                    {...register('prompt', {
                        required: true,
                        validate: (data) => data.trim().length > 0,
                    })}
                    maxLength={1000}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Send
                </Button>
            </form>
        </div>
    );
};

export default ChatBot;
