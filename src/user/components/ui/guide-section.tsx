
const GuideSection = ({ section }) => {
  const renderContent = (contentArray) => {
    return contentArray.map((item, index) => {
      if (item.type === "paragraph") {
        return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />;
      }

      if (item.type === "ordered-list") {
        return (
          <ol key={index} className="list-decimal pl-5 space-y-2 mb-4">
            {item.items.map((listItem, i) => (
              <li key={i}>
                {typeof listItem === 'string' ? (
                  <span dangerouslySetInnerHTML={{ __html: listItem }} />
                ) : (
                  <>
                    <span dangerouslySetInnerHTML={{ __html: listItem.text }} />
                    {listItem.subItems && (
                      <ul className="list-disc pl-5 mt-1">
                        {listItem.subItems.map((sub, j) => (
                          <li key={j}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>
        );
      }

      if (item.type === "unordered-list") {
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {item.items.map((listItem, i) => (
              <li key={i}>{listItem}</li>
            ))}
          </ul>
        );
      }

      if (item.type === "subheading") {
        return (
          <div key={index}>
            <h3 className="font-bold mt-4">{item.title}</h3>
            {item.text && <p>{item.text}</p>}
            {item.content && renderContent(item.content)}
            {item.list && renderContent([item.list])}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <section id={section.id} className="mb-10">
      <h2 className="text-xl font-semibold bg-yellow-100 p-3 mb-4">{section.title}</h2>
      <div className="prose max-w-none">
        {renderContent(section.content)}
      </div>
    </section>
  );
};

export default GuideSection;