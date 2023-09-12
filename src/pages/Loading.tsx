import { ProgressSpinner } from 'primereact/progressspinner';

function Loading() {
  return (
    <div>
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>  
    </div>
  )
}

export default Loading
