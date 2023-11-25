import { Grid, Stack } from '@mui/material'
import { useState } from "react";

 const Posts = () => {

    const [posts, setPosts] = useState(
        [
            {Post_title: 'Bruin Plate', Post_body: 'lorem iosum', Post_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbruinplate.hh.ucla.edu%2F&psig=AOvVaw3aeVuUrr28Blt9vQZREX0O&ust=1700958356656000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjK6-bx3YIDFQAAAAAdAAAAABA9', author: 'Bob', id: 1},
            {Post_title: 'Epicuria', Post_body: 'lorem iosum', Post_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fportal.housing.ucla.edu%2Fdining-locations%2Fde-neve&psig=AOvVaw257e1Wvk14Yj69MxmTm-d6&ust=1700958480203000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOix1KHy3YIDFQAAAAAdAAAAABAJ', author: 'John', id: 2},
            {Post_title: 'De Neve', Post_body: 'lorem iosum', Post_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.epicuria.ucla.edu%2F&psig=AOvVaw1ZfeHByQQ73WeQi6IAclz8&ust=1700958497781000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIj5gqry3YIDFQAAAAAdAAAAABAs', author: 'Smith', id: 3}    
        ]
    )
    return (
        <Stack>
        <div className="Posts">
            {posts.map((post) => (
                <div className="post-preview" key={posts.id}>
                    <h2>{post.title}</h2>
                    <img
                    src={post.Post_image}
                    alt={post.Post_title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div className="buttons">

                    <button>Comment</button>
                    <button>Like</button>
                    <button>Save</button>

                    </div>
                    <p>Written by {post.author}</p>
                </div>
            ))}
        </div>

        </Stack>
    )
}

export default Posts