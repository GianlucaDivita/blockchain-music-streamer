# Blockchain Music Streamer

# Gianluca Di Vita - 101415332

# Nader Fathzadeh - 101441256

# Umut Yorulmaz - 101410083

# Sarim Sohail - 101416162

# REQUIREMENTS:

PROBLEM STATEMENT: Currently music platforms such as; Spotify, Apple music have become a monopoly, which allows them to create enormous revenue from artists, content creators and users(listeners). This revenue is unfair, even some artists, especially the amateurs, can't make any money by publishing their songs on these platforms. Another issue is copyrights. Today’s platforms offer a very restrictive copyright system which does not help creators to get influenced by each other. Moreover they don't have a reward system which can organize interactions between artists. For instance, a payment system to buy and sell samples( part of a song of an artist which can be used by another artist in her or his song ) between artists.

GOALS: There are two 2 goals of the project:
By removing the middleman from the equation, such as; Spotify or Apple music, we are hoping to connect consumers(listeners) to the artists directly. Which will help us to create more revenue for content creators(artists) for cheaper prices for users. There will still be costs to maintain the platform, we need developers. However compared with today’s music streamer providers the costs will be very little.  
We want to improve the copyright system by introducing sampling. Sampling occurs when an artist uses another artist’s song to create his or her song. In this case our platform will enable us to track it and provide a fair cut to the artist whose song is used as a source song.

STAKEHOLDERS: Artists and Producers, Users/Listeners, Developers

RESTRICTIONS / RULES: Users, Artists and Developers will have different rights to interact with the platform. In order to make this happen we will implement role based access control design patterns on the block chain side and we will develop different user interfaces for each on the front end side. There will be rules to use platforms to keep the environment harassment free and to make sure everyone respects the property rights of others. Rules and regulations will be kept to minimum in order to support freedom of speech and creation, and avoid censorship.

DATA: In order for people to start to use the platform they need to create a profile with their email address, username, password and payment information(debit/ credit card, Apple pay, Paypal ) or payment of proof (if transfers made by crypto funds). This data will be kept off-chain and can’t be reached by anyone else except the account owner and the payment handler (platform). Another set of data that we need is; the content created, in our case they are the songs and the podcasts. It is explained in this document in the architecture part how we are planning to handle the management of it . Any data won't be used, processed or sold.
.
EXCEPTIONS: In order to follow if everything is on the track or not, we will be using a dashboard. It will enable us to see when any deviation or exception occurs and take action accordingly.

USER STORIES:

An artist using the platform: Any artist can create an account and start to use the platform by signing up and paying a monthly subscription fee. The fee can be paid by credit or debit card(fiat money), paypal(fiat money) or crypto funds. Payments will be converted to the platform’s native token and kept in the vault of the platform. Platform allows artists and content creators to publish their music and their podcasts. Everytime their art is listened to by a user/listener it will be counted, and at the end of a certain time a smart contract will be triggered and funds will be shared according to the number of listens. Moreover, As mentioned above, a sampling mechanism will be implemented in order to support creation and fair distribution of revenue. By doing this artists can sample each other's music to create their own and can pay each other with the platform’s native token. A smart contract will be triggered whenever sampling occurs and funds will be transferred from the platform's vault to the related artist. There will be rules to use platforms such as; creators should avoid insulting others, copying others creations. Rules and regulations will be kept to minimum in order to support freedom of speech and creation, and avoid censorship.

A consumer / listener using the platform: Anyone who wants to use the application can create an account and start to use the platform by signing up and paying a monthly subscription fee. The fee can be paid by credit or debit card(fiat money), paypal(fiat money) or crypto funds. Payments will be converted to the platform’s native token and kept in the vault of the platform.
Platform allows users to listen to music and podcasts and buy an album. There will be rules to use platforms such as; listeners should avoid insulting others. Rules and regulations will be kept to minimum in order to support freedom of speech and creation, and avoid censorship.

A Developer using the platform: In order to create and maintain the platform developers are needed. Developers’ jobs will be rewarded by the revenue created by users,artists and the expected increase in the platform’s native token’s value. It will be paid as the platform's native token.

PROJECT PLAN: Breakdown of tasks, time estimate per task, task assigned to roles and length of time to complete can be all found in the gantt chart below.

DEPENDENCIES: In order to move forward with this section requirements part of the project must be finished.

# GANTT CHART:

https://docs.google.com/spreadsheets/d/1YLJVg49nshtXxQ1eKMOwX5d2JnHlBojcbjt5irmhjTY/edit?usp=sharing

# ARCHITECTURE:

ABSTRACT / TOP LEVEL DESCRIPTION: A platform on block chain that mimics a service like Spotify or Apple Music. The logic will have a user deposit a subscription fee and then be able to interact (play music) from an artist (or many). Each iteration is counted and after a given time the subscription fee is paid out in proportion to how many interactions the user has had with each artist. The more interactions mean a larger cut of the subscription payout.

PROJECT DESCRIPTION: We are creating a block chain music streamer for users/consumers, artists and developers. Which enables listeners to listen to music or podcasts on the platform by paying a monthly subscription fee. Moreover, the platform allows artists to publish their songs and get rewards per listen and their music can influence and be used by other artists to a certain level(%100 copying the content is not allowed to respect property rights). Artists and content creators must pay a monthly subscription fee as well. In addition to it, the platform will welcome and encourage developers to maintain and update the platform. Code will be open-source. Developers will be rewarded by the revenue created in the platform. Design patterns are explained throughout the document to be implemented to different parts of the project such as; different permissions to different stakeholders,data management, security.  
PROJECT WORKFLOW:

# PROJECT WORKFLOW

![Blank diagram (1)](https://user-images.githubusercontent.com/10506708/208255466-b0aaa3be-e927-4558-a058-bed7b9d5d4f7.jpeg)

FUNCTIONS:

INPUTS / OUTPUTS

addArtist

Takes an address, stores it in an array

INPUT: Address type
OUTPUT: Array index position

Deposit

Takes value and holds it in the contract

INPUT: Uint type
OUTPUT: Value stored

distributeFunds

Pays out value from contract

INPUT: interactions mapping
OUTPUT: pay out through for-loop

incrementArtist

Add to the artist interactions

INPUT: Address type
OUTPUT: Address => uint256 mapping

artistInteractions

View artist interactions

INPUT: address type
OUTPUT: uint type

getContractBalance

View balance in smart contract

INPUT: View / call
OUTPUT: Uint type

totalInteractions

View total amount of interactions

INPUT: View / call
OUTPUT: Uint type

TECH STACK: In order to develop this project we will use; Solidity to write the smart contract, React and JavaScript to develop the front-end user interface, Node.js and Express to develop the back-end. We will use Metamask and Goerli test net to test the project. And Remix will be used to test and write Smart contracts.

DATA: Data will be handled by using design patterns such as; encrypting on-chain data, tokenization, and off-chain storage. Encryption on-chain data and off-chain storage will be used to create and store the hash value of the MP3, which will be stored originally off-chain to keep the block chain execution fees minimum. Use of applications such as IPFS would assist with this. User subscription and music data will be implemented to the project at further development stages.

# SMART CONTRACT:

REMIX

https://keep.google.com/u/0/media/v2/1UhGsh6LXm0AMY4oJv6jyK3b1x5okdZwmBcxq0AoZbyAbv9BjCqG3lsSHDn_p2kQ/10s_oc7S64W4QVR2LdCX6UhGzOUKBgLL74qkq_HczRz6b3XmUhV0WzVQMnETdZA?sz=512&accept=image%2Fgif%2Cimage%2Fjpeg%2Cimage%2Fjpg%2Cimage%2Fpng%2Cimage%2Fwebp

# WEB INTERFACE:

REACT

https://drive.google.com/file/d/1JjvGSyKfMmuiVV0DlwVsyeY964cTK_qC/view?usp=share_link

# VIDEO DEMOSTRATION

REMIX:
https://user-images.githubusercontent.com/10506708/208256226-9aaef12b-12ed-4ac1-a9da-a4a728746c69.mp4
FRONT-END:
https://drive.google.com/file/d/1qmZD_K1YTeicK_AhlAP4UWhIQAlTxwFX/view?usp=share_link
