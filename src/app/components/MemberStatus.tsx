"use client";
import { useState, useEffect } from 'react';
import { User, Shield, Users, Calendar, Award, ExternalLink, Heart, Trophy, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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

  const benefitCategories = [
    {
      title: "Service & Impact",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-rose-100 text-rose-600 border-rose-200",
      benefits: [
        "Access to all philanthropy projects & volunteering"
      ]
    },
    {
      title: "Social & Community",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      benefits: [
        "Exclusive socials & mixers",
        "Circles (Small groups competing and having fun year-round)",
        "Free member-only parties",
        "Free intramural sports teams"
      ]
    },
    {
      title: "Special Events",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600 border-purple-200",
      benefits: [
        "Access to Camping trips & M&D events",
        "Chances for invites to end of semester celebrations such as boat formal and Lakehouse!",
        "Discounted event prices"
      ]
    },
    {
      title: "Professional Growth",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200",
      benefits: [
        "Alumni database access for networking",
        "Leadership opportunities"
      ]
    }
  ];

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

  if (!isMember) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Not a Member</h3>
            <p className="text-sm text-gray-500">Standard user access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Member Status */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Member</h3>
            <p className="text-sm text-gray-500">Active membership status</p>
          </div>
        </div>
      </div>

      {/* Member Benefits Categories */}
      <div className="space-y-4">
        {benefitCategories.map((category, index) => (
          <div key={index} className={`rounded-lg border p-4 ${category.color.replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[0]} ${category.color.split(' ')[2]}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-full ${category.color}`}>
                {category.icon}
              </div>
              <h4 className="font-semibold text-gray-900">{category.title}</h4>
            </div>
            <ul className="space-y-2">
              {category.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="text-sm text-gray-700 flex items-start">
                  <span className="text-gray-400 mr-2 mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Member Resources */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 text-center">
        <h4 className="text-lg font-bold text-green-800 mb-2">Member Resources</h4>
        <p className="text-sm text-green-700 mb-4">Connect with our alumni network</p>
        <Link 
          href="/alumni" 
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Users className="w-5 h-5" />
          <span>View Alumni Database</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}