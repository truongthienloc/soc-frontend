.text

#Immediate number create to check action of them 

Main:
		addi    x23 , x0 , 0	#i
		addi    x22 , x0 , 1	#Result
		addi    x31 , x0 , 2	#x
		addi    x20 , x0 , 11	#n
Loop:
		bge     x23 , x20 , Result 
		slli    x22 , x22 , 3 
		addi    x23 , x23 , 1 
		jal     x0 , Loop 
Result:
		addi    x22 , x22 , -1 
		addi    x6 , x0 , 2047 
		bne     x22 , x6 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
