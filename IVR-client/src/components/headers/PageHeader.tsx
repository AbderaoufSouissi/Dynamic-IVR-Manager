

const PageHeader = ({title }:{title: string}) => {
  return (
    <div className="mb-1">
          <p className="text-2xl font-bold text-slate-900">
           {title}
          </p>
        </div>
  )
}

export default PageHeader