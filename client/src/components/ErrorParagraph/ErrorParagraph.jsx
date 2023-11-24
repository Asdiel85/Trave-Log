export default function ErrorParagraph({message, testId}) {
    return (
        <p data-testid ={testId} style={{color: 'red', margin: '0'}}>{message}</p>
    )
}