.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x31 , x0 , x0 	#i
		addi    x23 , x0 , 1 	#Result
		addi    x3 , x0 , 0 	#x
		addi    x18 , x0 , 3 	#n
Loop:
		bge     x31 , x18 , Result 
		slli    x31 , x31 , 3 
		addi    x31 , x31 , 1 
		jal     x0 , Loop
Result:
		addi    x4 , x0 , 0 
		bne     x31 , x4 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
