import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import CreateRoomDialog from '../components/dashboard/CreateRoomDialog';
import JoinRoomDialog from '../components/dashboard/JoinRoomDialog';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoinRoomDialogOpen, setIsJoinRoomDialogOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-gray-300">Introducing ChatFlow 2.0</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Team Communication
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Reimagined
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect your team with lightning-fast messaging, seamless collaboration,
          and powerful integrations. Everything you need to stay productive, all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          
          <button onClick={() => setIsJoinRoomDialogOpen(true)} className="group bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl">
            <span >Join Room</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => setIsOpen(true)} className="bg-transparent text-white px-8 py-4 rounded-md font-semibold border-2 border-white/20 hover:border-white/40 transition-all">
            Create Room
          </button>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <div className="relative rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="space-y-4">

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className=" image w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/20 rounded w-32 mb-1"></div>
                      <div className="h-2 bg-white/10 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded w-full mb-1"></div>
                  <div className="h-2 bg-white/10 rounded w-3/4"></div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 ml-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/20 rounded w-32 mb-1"></div>
                      <div className="h-2 bg-white/10 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded w-full mb-1"></div>
                  <div className="h-2 bg-white/10 rounded w-2/3"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && 
        <CreateRoomDialog  isOpen={isOpen} setIsOpen={setIsOpen}/>
      }
      {isJoinRoomDialogOpen && 
        <JoinRoomDialog isOpen={isJoinRoomDialogOpen} setIsOpen={setIsJoinRoomDialogOpen}/>
      }
    </div>
  );
}
