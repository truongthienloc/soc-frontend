.text

#Immediate number create to check action of them 

Main:
		addi    x17 , x0 , 0	#i
		addi    x1 , x0 , 1	#Result
		addi    x14 , x0 , 2	#x
		addi    x11 , x0 , 11	#n
Loop:
		bge     x17 , x11 , Result 
		slli    x1 , x1 , 3 
		addi    x17 , x17 , 1 
		jal     x0 , Loop 
Result:
		addi    x1 , x1 , -1 
		addi    x2 , x0 , 2047 
		bne     x1 , x2 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
