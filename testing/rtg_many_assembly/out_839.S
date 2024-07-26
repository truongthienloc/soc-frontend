.text

#Immediate number create to check action of them 

Main:
		addi    x2 , x0 , 0	#i
		addi    x11 , x0 , 1	#Result
		addi    x26 , x0 , 2	#x
		addi    x12 , x0 , 11	#n
Loop:
		bge     x2 , x12 , Result 
		slli    x11 , x11 , 3 
		addi    x2 , x2 , 1 
		jal     x0 , Loop 
Result:
		addi    x11 , x11 , -1 
		addi    x6 , x0 , 2047 
		bne     x11 , x6 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
