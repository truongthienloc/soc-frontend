.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x4 , x0 , x0 	#i
		addi    x26 , x0 , 1 	#Result
		addi    x2 , x0 , 8 	#x
		addi    x15 , x0 , 1 	#n
Loop:
		bge     x4 , x15 , Result 
		slli    x4 , x4 , 3 
		addi    x4 , x4 , 1 
		jal     x0 , Loop
Result:
		addi    x25 , x0 , 8 
		bne     x4 , x25 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
