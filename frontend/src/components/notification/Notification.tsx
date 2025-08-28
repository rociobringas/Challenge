import "./Notification.css";

export type NotificationProps = {
    message: string;
    type?: "success" | "error";
};

export function Notification({ message, type = "success" }: NotificationProps) {
    return (
        <div className={`notification notification--${type}`} role="alert">
            <span>{message}</span>
        </div>
    );
}