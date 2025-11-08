import React, { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { callOpenRouterApi } from '../../utils/openRouterApi';

interface AnalysisItem {
    factor: string;
    status: 'Good' | 'Needs Improvement' | 'Missing';
    recommendation: string;
}

const AiLoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        <span>Analyzing...</span>
    </div>
);

const SerpPreview: React.FC<{ title: string; description: string; url: string }> = ({ title, description, url }) => (
    <div className="p-4 bg-white dark:bg-brand-bg rounded-lg border border-brand-border font-sans">
        <p className="text-sm text-gray-700 dark:text-brand-text-secondary truncate">{url || 'https://www.example.com/page-path'}</p>
        <h3 className="text-blue-600 dark:text-blue-500 text-xl truncate hover:underline cursor-pointer">{title || 'Your SEO Title Will Appear Here'}</h3>
        <p className="text-sm text-gray-600 dark:text-brand-text-secondary">{description || 'This is how your meta description will look in the Google search results. Make it count!'}</p>
    </div>
);

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    if (status === 'Good') return <span className="text-green-500">✔</span>;
    if (status === 'Needs Improvement') return <span className="text-yellow-500">!</span>;
    if (status === 'Missing') return <span className="text-red-500">✖</span>;
    return null;
};


const GoogleSerpPreviewTool: React.FC = () => {
    const [title, setTitle] = useState('DiceTools | The Best Free Online Tools');
    const [description, setDescription] = useState('A powerful suite of 80+ free online tools for text manipulation, data conversion, development, AI, PDF editing, and more.');
    const [url, setUrl] = useState('https://dicetools.com');
    const [focusKeyword, setFocus