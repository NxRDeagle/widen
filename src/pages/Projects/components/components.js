export default function ProjectBtn({ children, caption, disabled = true, onClick }) {
    return (
        <button onClick={onClick} disabled={disabled} className='projects-container_btn-box'>
            <h2 className='projects-container_btn-box__head'>{children}</h2>
            <p className='projects-container_btn-box__caption'>{caption}</p>
            {
                disabled && <p className='projects-container_btn-box__note'>(Раздел в разработке, дико извиняемся)</p>
            }
        </button>
    )
}