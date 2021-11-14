const getAllBlogs = (blogPosts) => {
  const allPosts = []
  blogPosts.map((blog) => {
    allPosts.push({
      intro: blog.intro,
      myBiggestTakeAways: blog.myBiggestTakeAways,
      theDailyGrind: blog.theDailyGrind,
      theThingsILove: blog.theThingsILove,
      theThingsIDisLike: blog.theThingsIDisLike,
      interestingFacts: blog.interestingFacts
    })
  })

  return allPosts
}

module.exports = { getAllBlogs }