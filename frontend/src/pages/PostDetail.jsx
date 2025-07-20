import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, message, Divider, List, Avatar, Space } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);
    const [form] = Form.useForm();
    const [commentCount, setCommentCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        hasMore: true
    });
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (comments.length > 0) {
            console.log('Comment timestamps:', comments.map(c => c.createdAt));
        }
    }, [comments]);

    // Fetch post details
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const postResponse = await axios.get(`http://localhost:3000/posts/${postId}`);
                setPost(postResponse.data);
                setLoading(false);
            } catch (error) {
                message.error('Failed to fetch post details');
                setLoading(false);
                navigate('/');
            }
        };

        fetchPost();
    }, [postId, navigate]);

    // Fetch comments with infinite scroll
    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`, {
                params: {
                    page: pagination.page,
                    pageSize: pagination.pageSize
                }
            });

            const newComments = response.data.comments;
            const totalCount = response.data.totalCount;

            setCommentCount(totalCount); // <-- NEW

            setComments(prev => {
                const existingIds = new Set(prev.map(c => c._id));
                const filteredNewComments = newComments.filter(c => !existingIds.has(c._id));
                return [...prev, ...filteredNewComments];
            });

            setPagination(prev => ({
                ...prev,
                page: prev.page + 1,
                hasMore: newComments.length === prev.pageSize
            }));
        } catch (error) {
            message.error('Failed to load comments');
            setPagination(prev => ({ ...prev, hasMore: false }));
        }
    }, [postId, pagination.page, pagination.pageSize]);


    // Initial comments load
    useEffect(() => {
        if (postId && pagination.page === 1) {
            fetchComments();
        }
    }, [postId, fetchComments]);

    const handleAddComment = async () => {
        try {
            setCommentLoading(true);
            const values = await form.validateFields();

            const response = await axios.post(
                `http://localhost:3000/posts/${postId}/comments`,
                { content: values.content },
                { withCredentials: true }
            );

            // The response now includes the populated author data
            setComments(prev => [response.data, ...prev]);
            setCommentCount(prev => prev + 1);
            form.resetFields();
            message.success('Comment added successfully');
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to add comment');
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '24px', textAlign: 'center' }}>Loading post...</div>;
    }

    if (!post) {
        return <div style={{ padding: '24px', textAlign: 'center' }}>Post not found</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Button type="link" onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
                ← Back to Posts
            </Button>

            <Card
                title={post.title}
                style={{ marginBottom: '24px' }}
            >
                <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>

                <Divider orientation="left" plain>
                    Comments ({commentCount})
                </Divider>


                <Form form={form} onFinish={handleAddComment}>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: 'Please input your comment!' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Write your comment here..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={commentLoading}
                            icon={<MessageOutlined />}
                        >
                            Add Comment
                        </Button>
                    </Form.Item>
                </Form>

                <div
                    id="scrollableDiv"
                    ref={scrollContainerRef}
                    style={{
                        height: '500px',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        borderRadius: '4px'
                    }}
                >
                    <InfiniteScroll
                        dataLength={comments.length}
                        next={fetchComments}
                        hasMore={pagination.hasMore}
                        loader={<div style={{ textAlign: 'center', padding: '10px' }}>Loading more comments...</div>}
                        endMessage={
                            comments.length > 0 ? (
                                <Divider plain>No more comments</Divider>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    No comments yet. Be the first to comment!
                                </div>
                            )
                        }
                        scrollableTarget="scrollableDiv"
                        scrollThreshold="100px"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={comments}
                            renderItem={(comment) => (
                                <List.Item style={{ padding: '12px 0' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={
                                            <Space>
                                                <span>{comment.author?.username || 'Anonymous'}</span>
                                                <span style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
                                                    {comment.createdAt ? moment(comment.createdAt).fromNow() : 'Just now'}
                                                </span>
                                            </Space>
                                        }
                                        description={comment.content}
                                    />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Card>
        </div>
    );
};

export default PostDetail;