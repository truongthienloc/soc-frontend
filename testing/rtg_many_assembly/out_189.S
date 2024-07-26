.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x16 , x0 , x0 	#i
		addi    x30 , x0 , 1 	#Result
		addi    x15 , x0 , 2 	#x
		addi    x12 , x0 , 1 	#n
Loop:
		bge     x16 , x12 , Result 
		slli    x16 , x16 , 3 
		addi    x16 , x16 , 1 
		jal     x0 , Loop
Result:
		addi    x27 , x0 , 2 
		bne     x16 , x27 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
