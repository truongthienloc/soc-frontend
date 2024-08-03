.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x16 , x0 , x0 	#i
		addi    x6 , x0 , 1 	#Result
		addi    x31 , x0 , 3 	#x
		addi    x12 , x0 , 2 	#n
Loop:
		bge     x16 , x12 , Result 
		slli    x16 , x16 , 3 
		addi    x16 , x16 , 1 
		jal     x0 , Loop
Result:
		addi    x17 , x0 , 9 
		bne     x16 , x17 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
