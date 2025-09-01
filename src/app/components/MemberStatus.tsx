// components/MemberStatus.tsx
"use client";
import { useState, useEffect } from 'react';
import { User, Shield } from 'lucide-react';

interface MemberStatusProps {
  userId: string;
}

export default function MemberStatus({ userId }: MemberStatusProps) {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberStatus();
  }, [userId]);

  const fetchMemberStatus = async () => {
    try {
      const response = await fetch(`/api/member-status?userId=${userId}`);
      const data = await response.json();
      setIsMember(data.is_member);
    } catch (error) {
      console.error('Error fetching member status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${
          isMember ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {isMember ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {isMember ? 'Member' : 'Not a Member'}
          </h3>
          <p className="text-sm text-gray-500">
            {isMember ? 'Active membership status' : 'Standard user access'}
          </p>
        </div>
      </div>
    </div>
  );
}