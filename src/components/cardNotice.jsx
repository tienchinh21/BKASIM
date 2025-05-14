
function CardNotice({ title, subTitle }) {
    return (
        <div className="card-notice">
            <div className="card-notice-content">
                <h3 className="card-notice-title">{title}</h3>
                <p className="card-notice-subTitle">{subTitle}</p>
            </div>
        </div>
    );
}
export default memo(CardNotice);


