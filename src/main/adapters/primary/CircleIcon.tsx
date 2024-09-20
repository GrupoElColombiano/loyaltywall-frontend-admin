import "../../../App.css";

function CircleIcon({ url }: { url: string }) {
    return (
        <div className="circle_container">
            <img src={url} alt="Icon" style={{ fill: "white" }} />
        </div>
    );
}

export default CircleIcon;
