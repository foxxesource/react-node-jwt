import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, Input, Pagination, Button, Modal, Form, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [form] = Form.useForm();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/posts`, {
                params: {
                    page,
                    pageSize,
                    keyword: searchTerm || undefined
                },
                withCredentials: true
            });
            setPosts(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            message.error('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, pageSize, searchTerm]);

    const handleAddPost = () => {
        if (!user) {
            message.warning('Please login to create a post');
            return;
        }
        setCurrentPost(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditPost = (post) => {
        setCurrentPost(post);
        form.setFieldsValue({
            title: post.title,
            content: post.content
        });
        setIsModalVisible(true);
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${postId}`, { 
                withCredentials: true 
            });
            message.success('Post deleted successfully');
            fetchPosts();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to delete post');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            if (currentPost) {
                await axios.put(`http://localhost:3000/posts/${currentPost._id}`, values, { 
                    withCredentials: true 
                });
                message.success('Post updated successfully');
            } else {
                await axios.post(`http://localhost:3000/posts`, values, { 
                    withCredentials: true 
                });
                message.success('Post created successfully');
                setPage(1);
            }
            
            setIsModalVisible(false);
            fetchPosts();
        } catch (error) {
            message.error(error.response?.data?.message || 'Error submitting post');
        }
    };

    // Check if current user is the author of a post
    const isAuthor = (post) => {
        return user && post.author?._id === user._id;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Input
                    placeholder="Search posts by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '70%' }}
                    allowClear
                />
                {user && (
                    <Button type="primary" onClick={handleAddPost}>
                        Add New Post
                    </Button>
                )}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading posts...</div>
            ) : (
                <>
                    {posts.map((post) => (
                        <Card
                            key={post._id}
                            style={{
                                marginBottom: '16px',
                                transition: 'all 0.3s',
                                ':hover': {
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                            actions={[
                                isAuthor(post) && (
                                    <Button type="link" onClick={() => handleEditPost(post)}>
                                        Edit
                                    </Button>
                                ),
                                isAuthor(post) && (
                                    <Button 
                                        type="link" 
                                        danger 
                                        onClick={() => handleDeletePost(post._id)}
                                    >
                                        Delete
                                    </Button>
                                ),
                                <Link to={`/posts/${post._id}`}>
                                    <Button type="link">Comment</Button>
                                </Link>
                            ].filter(Boolean)} // Remove falsy values from actions array
                        >
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <p style={{ color: '#666', fontSize: '0.8rem' }}>
                                    Author: {post.author?.username || 'Unknown'}
                                </p>
                            </div>
                        </Card>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={total}
                            onChange={(newPage, newPageSize) => {
                                setPage(newPage);
                                setPageSize(newPageSize);
                            }}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20', '50']}
                        />
                    </div>
                </>
            )}

            <Modal
                title={currentPost ? "Edit Post" : "Create New Post"}
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: 'Please input the content!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PostList;