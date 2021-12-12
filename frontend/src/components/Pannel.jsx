import University from "./pannel_component/University";

export default function Pannel(props) {
    switch (props.type) {
        case "student":
            return (
                <div className="container mt-5">
                    <University />
                </div>
            );
        case "teacher":
            return (
                <div className="container">
                </div>
            );
        default:
            return (
                <>
                </>
            );
    }
}