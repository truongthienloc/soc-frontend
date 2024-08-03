.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x28 , x0 , x0 	#i
		addi    x2 , x0 , 1 	#Result
		addi    x3 , x0 , 13 	#x
		addi    x19 , x0 , 3 	#n
Loop:
		bge     x28 , x19 , Result 
		slli    x28 , x28 , 3 
		addi    x28 , x28 , 1 
		jal     x0 , Loop
Result:
		addi    x5 , x0 , 2197 
		bne     x28 , x5 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
