import { useForm } from 'react-hook-form';
import { Button } from './ui/button';

type FormData = {
    prompt: string;
};

const ChatBot = () => {
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
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
    );
};

export default ChatBot;
