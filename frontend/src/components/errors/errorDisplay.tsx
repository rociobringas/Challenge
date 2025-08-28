
import type { ErrorDisplayProps } from "../../types/ErrorType.ts";

export function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="error-display">
            <p>{message}</p>
        </div>
    );
}