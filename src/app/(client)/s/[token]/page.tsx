'use client';

import React, { useState } from 'react';
import { Card, Button, Radio, Input, Result, Spin, message, Progress } from 'antd';
import { useParams } from 'next/navigation';
import { MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

const QUESTIONS = [
    { id: 1, text: 'How satisfied are you with our service?', type: 'scale', options: [1, 2, 3, 4, 5] },
    { id: 2, text: 'What feature would you like to see next?', type: 'text' },
    { id: 3, text: 'Would you recommend us to a friend?', type: 'yesno' }
];

export default function ClientQAPage() {
    const { token } = useParams();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock Token Validation
    const isValid = typeof token === 'string' && token.startsWith('valid');
    const isExpired = typeof token === 'string' && token.startsWith('expired');

    if (isExpired) {
        return (
            <Card className="w-full max-w-md shadow-lg text-center p-8">
                <Result status="error" title="Link Expired" subTitle="This survey link is no longer active." />
            </Card>
        )
    }

    if (!isValid && token !== 'demo') { // Allow 'demo' for testing
        return (
            <Card className="w-full max-w-md shadow-lg text-center p-8">
                <Spin tip="Validating..." />
                {/* Logic would normally redirect or error here */}
                <div className="mt-4 text-red-500">Invalid Token (Use 'valid-123' or 'demo')</div>
            </Card>
        )
    }

    if (submitted) {
        return (
            <Card className="w-full max-w-md shadow-lg text-center p-8 border-t-4 border-green-500">
                <Result
                    status="success"
                    title="Thank You!"
                    subTitle="Your feedback has been recorded."
                    extra={[
                        <Button type="primary" key="console" onClick={() => window.close()}>
                            Close Window
                        </Button>,
                    ]}
                />
            </Card>
        );
    }

    const currentQ = QUESTIONS[step];
    const progress = Math.round(((step) / QUESTIONS.length) * 100);

    const handleNext = () => {
        if (!answers[currentQ.id] && currentQ.type !== 'text') {
            message.warning('Please select an option');
            return;
        }

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setSubmitted(true);
            }, 1500);
        }
    };

    return (
        <Card className="w-full max-w-lg shadow-xl border-0 rounded-2xl overflow-hidden">
            <div className="bg-indigo-600 p-6 text-center text-white">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-80" />
                <h1 className="text-xl font-bold">Feedback Survey</h1>
                <p className="opacity-80 text-sm">Help us improve your experience</p>
            </div>

            <div className="p-6">
                <Progress percent={progress} showInfo={false} strokeColor="#4F46E5" size="small" className="mb-6" />

                <div className="min-h-[200px]">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">{currentQ.text}</h3>

                    {currentQ.type === 'scale' && (
                        <Radio.Group
                            className="w-full flex justify-between"
                            onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                            value={answers[currentQ.id]}
                        >
                            {currentQ.options?.map(o => (
                                <Radio.Button key={o} value={o} className="w-12 h-12 flex items-center justify-center rounded-full border-gray-200">
                                    {o}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    )}

                    {currentQ.type === 'yesno' && (
                        <div className="flex gap-4">
                            <Button
                                block
                                size="large"
                                type={answers[currentQ.id] === 'Yes' ? 'primary' : 'default'}
                                onClick={() => setAnswers({ ...answers, [currentQ.id]: 'Yes' })}
                            >
                                Yes
                            </Button>
                            <Button
                                block
                                size="large"
                                type={answers[currentQ.id] === 'No' ? 'primary' : 'default'}
                                danger={answers[currentQ.id] === 'No'}
                                onClick={() => setAnswers({ ...answers, [currentQ.id]: 'No' })}
                            >
                                No
                            </Button>
                        </div>
                    )}

                    {currentQ.type === 'text' && (
                        <Input.TextArea
                            rows={4}
                            placeholder="Type your answer here..."
                            value={answers[currentQ.id]}
                            onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                        />
                    )}
                </div>

                <div className="mt-8 flex justify-end">
                    <Button
                        type="primary"
                        size="large"
                        className="bg-indigo-600 px-8"
                        onClick={handleNext}
                        loading={loading}
                        icon={step === QUESTIONS.length - 1 ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
                        iconPosition="end"
                    >
                        {step === QUESTIONS.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
