.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x29 , x0 , x0 	#i
		addi    x9 , x0 , 1 	#Result
		addi    x20 , x0 , 4 	#x
		addi    x27 , x0 , 1 	#n
Loop:
		bge     x29 , x27 , Result 
		slli    x29 , x29 , 3 
		addi    x29 , x29 , 1 
		jal     x0 , Loop
Result:
		addi    x12 , x0 , 4 
		bne     x29 , x12 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
