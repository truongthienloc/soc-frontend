.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x22 , x0 , x0 	#i
		addi    x15 , x0 , 1 	#Result
		addi    x5 , x0 , 14 	#x
		addi    x4 , x0 , 2 	#n
Loop:
		bge     x22 , x4 , Result 
		slli    x22 , x22 , 3 
		addi    x22 , x22 , 1 
		jal     x0 , Loop
Result:
		addi    x26 , x0 , 196 
		bne     x22 , x26 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
