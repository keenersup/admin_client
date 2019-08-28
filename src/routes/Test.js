// import React, {useRef, useMemo,useState, useCallback } from "react"
//
// const Counter =  React.memo(() => {
//   const [counter, setCounter] = useState(0)
//   const renders = useRef(0)
//
//   return (
//     <div>
//       <div>Counter: {counter}</div>
//       <div>Renders: {renders.current++}</div>
//       <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
//     </div>
//   )
// })
//
// export default function Test() {
//   const [value, setValue] = useState("")
//   const [newValue, setNewValue] = useState("")
//
//   const addHello = useCallback(() => setValue(value + "Hello!"), [value])
//   const myObject = useMemo(() => ({ key: "value" }), [])
//
//   return (
//     <div>
//       <input
//         type="text"
//         onChange={e => setValue(e.target.value)}
//         value={value}
//       />
//       <input
//         type="text"
//         onChange={e => setNewValue(e.target.value)}
//         value={newValue}
//       />
//       <Counter addHello={addHello} myObject={myObject} />
//     </div>
//   )
// }

import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { Icon } from "semantic-ui-react";


const Test = (props) => {
  const [treeData, setTreeData] = useState(
    [
      {
        title: <Icon name="folder" color="blue"> drag</Icon>,
        children: [{ title: 'index4.js' }, { title: 'drag4.js', },
          {
            title: <Icon name="folder" color="blue"> inner</Icon>,
            children: [{ title: 'index5.js' }, { title: 'test5.js' }],
            expanded: true
          },
        ], expanded: true
      },
      {
        title: <Icon name="folder" color="blue"> src2</Icon>,
        children: [{ title: 'index2.js' }, { title: 'test2.js' }]
      },
      {
        title: <Icon name="folder" color="blue"> src1</Icon>,
        children: [{ title: 'index1.js' }, { title: 'test1.js' }]
      },
      {
        title: <Icon name="folder" color="blue"> src3</Icon>,
        children: [{ title: 'index3.js' }, { title: 'test3.js' }],
        expanded: true
      },
    ],
  )

  const hasOwnNestedProperty = function (obj, pathname) {
    if (obj) {
      for (let i = 0, path = pathname.split('.'), len = path.length; i < len; i++) {
        if (obj.hasOwnProperty(path[i])) {
          obj = obj[path[i]];
          if (!obj) return false;
        } else {
          return false
        }
      }
      return true;
    }
  }

  const checkedTitle = (title) => {
    if (title.props) {
      // return title.props.children
      return ""
    }
    return title
  }

  treeData.sort((a, b) => {
    return checkedTitle(a.title) < checkedTitle(b.title) ? -1 : checkedTitle(a.title) > checkedTitle(b.title) ? 1 : 0;
  })
  treeData[0].children.sort((a, b) => {
      return checkedTitle(a.title) < checkedTitle(b.title) ? -1 : checkedTitle(a.title) > checkedTitle(b.title) ? 1 : 0;
  })

  return (
    <div style={{ height: 200 }}>
      <SortableTree
        treeData={treeData}
        onChange={(treeData) => {
          setTreeData(treeData)
        }}
        generateNodeProps={({ node, path }) => {
          if (path.length <= 1) {
            if (hasOwnNestedProperty(node, "title.props.name")) {
              if (!(node.title.props.name === "folder")) {
                return {
                  ...node,
                  title: <span style={{ color: "blue" }}>{node.title}</span>
                }
              }
            } else {
              return {
                ...node,
                title: <span style={{ color: "blue" }}>{node.title}</span>
              }
            }
          }
        }}
        canDrop={({ nextPath, nextParent }) => {
          if (nextPath.length <= 1) {
            return true
          }
          if (hasOwnNestedProperty(nextParent, "title.props.name")) {
            return (nextParent.title.props.name === "folder")
          }
        }}
        maxDepth={4}
        canNodeHaveChildren={node => {
          if (hasOwnNestedProperty(node, "title.props.name")) {
            return (node.title.props.name === "folder")
          }
        }}
        theme={FileExplorerTheme}
      />
    </div>
  );
}

export default Test;
