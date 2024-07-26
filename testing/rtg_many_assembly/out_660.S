.text

#Immediate number create to check action of them 

Main:
		addi    x19 , x0 , 0	#i
		addi    x23 , x0 , 1	#Result
		addi    x22 , x0 , 2	#x
		addi    x11 , x0 , 11	#n
Loop:
		bge     x19 , x11 , Result 
		slli    x23 , x23 , 3 
		addi    x19 , x19 , 1 
		jal     x0 , Loop 
Result:
		addi    x23 , x23 , -1 
		addi    x26 , x0 , 2047 
		bne     x23 , x26 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
