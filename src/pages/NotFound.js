import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useSEO from '../hooks/useSEO';
import SEO from '../components/SEO';

const NotFound = () => {
    const seo = useSEO("/404");

    const aestheticStyles = {
        container: {
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
            color: '#ffffff',
            padding: '20px',
            fontFamily: "'Inter', sans-serif"
        },
        errorCode: {
            fontSize: '12rem',
            fontWeight: '900',
            background: 'linear-gradient(to bottom, #d4af37, #f9f295, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0',
            lineHeight: '1',
            letterSpacing: '-5px'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '300',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
        },
        text: {
            fontSize: '1.1rem',
            color: '#a0a0a0',
            maxWidth: '500px',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
        },
        button: {
            padding: '12px 35px',
            backgroundColor: '#d4af37',
            color: '#000',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            borderRadius: '0',
            transition: 'all 0.3s ease',
            border: '1px solid #d4af37'
        }
    };

    return (
        <>
            <SEO seo={seo} />
            <div style={aestheticStyles.container}>
                <h1 style={aestheticStyles.errorCode}>404</h1>
                <h2 style={aestheticStyles.title}>Journey Diverted</h2>
                <p style={aestheticStyles.text}>
                    The destination you are seeking cannot be reached. 
                    It may have moved or no longer exists in our current routes.
                </p>
                <Link to="/" style={aestheticStyles.button} 
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#d4af37';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#d4af37';
                        e.currentTarget.style.color = '#000';
                    }}
                >
                    Return to Home
                </Link>
            </div>
        </>
    );
};

export default NotFound;
