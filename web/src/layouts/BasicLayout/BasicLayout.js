const BasicLayout = ({ children }) => {
  return (
    <>
      <main className="p-5 sm:p-10 bg-green-500 h-screen w-screen">
        {children}
      </main>
    </>
  )
}

export default BasicLayout
