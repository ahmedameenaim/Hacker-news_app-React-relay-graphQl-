import React from 'react';
import Link from './Link'
import {createPaginationContainer,createFragmentContainer,graphql} from 'react-relay'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'
import {ITEMS_PER_PAGE} from '../constants'

class LinkList extends React.Component {
  
  componentDidMount() {
    NewVoteSubscription()
  }
  
  render() {
        console.log(this.props)
        const linksToRender  = [ {
            id: '1',
            description: 'The coolest GraphQL backend 😎',
            url: 'https://www.graph.cool'
        },
        {
            id: '2',
            description: 'Highly performant GraphQL client from Facebook',
            url: 'https://facebook.github.io/relay/'
        }]
        return(
            <div>
        {this.props.viewer.allLinks.edges.map(({node},index) => {
            return <Link key = {node.__id} index = {index} link = {node} />
        })}
        <div className='flex ml4 mv3 gray'>
        <div className='pointer' onClick={() => this._loadMore()}>More</div>
      </div>
      </div>
      
        );
    }
}

_loadMore() {
  if (!this.props.relay.hasMore()) {
    console.log(`Nothing more to load`)
    return
  } else if (this.props.relay.isLoading()) {
    console.log(`Request is already pending`)
    return
  }
    
  this.props.relay.loadMore(ITEMS_PER_PAGE)
}

export default createPaginationContainer(LinkList, 
  {
    viewer: graphql`
      fragment LinkList_viewer on Viewer {
        allLinks(
          first: $count,
          after: $after,
          orderBy: createdAt_DESC
        ) @connection(key: "LinkList_allLinks") {
          edges {
            node {
              ...Link_link
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  { direction: 'forward',
  query: graphql`
    query LinkListForwardQuery(
      $count: Int!,
      $after: String,
    ) {
      viewer {
        ...LinkList_viewer
      }
    }
  `,
  getConnectionFromProps(props) {
    return props.viewer && props.viewer.allLinks
  },
  getFragmentVariables(previousVariables, totalCount) {
    return {
      ...previousVariables,
      count: totalCount,
    }
  },
  getVariables(props, paginationInfo, fragmentVariables) {
    return {
      count: paginationInfo.count,
      after: paginationInfo.cursor,
    }
  }, }
)