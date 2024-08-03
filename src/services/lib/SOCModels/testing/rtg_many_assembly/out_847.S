.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x17 , x0 , x0 	#i
		addi    x14 , x0 , 1 	#Result
		addi    x18 , x0 , 13 	#x
		addi    x12 , x0 , 3 	#n
Loop:
		bge     x17 , x12 , Result 
		slli    x17 , x17 , 3 
		addi    x17 , x17 , 1 
		jal     x0 , Loop
Result:
		addi    x3 , x0 , 2197 
		bne     x17 , x3 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
