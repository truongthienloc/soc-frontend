.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x3 , x0 , x0 	#i
		addi    x8 , x0 , 1 	#Result
		addi    x11 , x0 , 11 	#x
		addi    x29 , x0 , 1 	#n
Loop:
		bge     x3 , x29 , Result 
		slli    x3 , x3 , 3 
		addi    x3 , x3 , 1 
		jal     x0 , Loop
Result:
		addi    x31 , x0 , 11 
		bne     x3 , x31 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
