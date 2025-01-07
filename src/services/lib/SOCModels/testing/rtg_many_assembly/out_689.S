.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x12 , x0 , x0 	#i
		addi    x9 , x0 , 1 	#Result
		addi    x7 , x0 , 13 	#x
		addi    x28 , x0 , 3 	#n
Loop:
		bge     x12 , x28 , Result 
		slli    x12 , x12 , 3 
		addi    x12 , x12 , 1 
		jal     x0 , Loop
Result:
		addi    x11 , x0 , 2197 
		bne     x12 , x11 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
