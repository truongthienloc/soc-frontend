.text

#Immediate number create to check action of them 

Main:
		addi    x5 , x0 , 0	#i
		addi    x11 , x0 , 1	#Result
		addi    x17 , x0 , 2	#x
		addi    x1 , x0 , 11	#n
Loop:
		bge     x5 , x1 , Result 
		slli    x11 , x11 , 3 
		addi    x5 , x5 , 1 
		jal     x0 , Loop 
Result:
		addi    x11 , x11 , -1 
		addi    x23 , x0 , 2047 
		bne     x11 , x23 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
