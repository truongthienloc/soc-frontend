.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x13 , x0 , x0 	#i
		addi    x7 , x0 , 1 	#Result
		addi    x9 , x0 , 2 	#x
		addi    x30 , x0 , 1 	#n
Loop:
		bge     x13 , x30 , Result 
		slli    x13 , x13 , 3 
		addi    x13 , x13 , 1 
		jal     x0 , Loop
Result:
		addi    x26 , x0 , 2 
		bne     x13 , x26 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
