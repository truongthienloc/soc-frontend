.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x5 , x0 , x0 	#i
		addi    x13 , x0 , 1 	#Result
		addi    x16 , x0 , 0 	#x
		addi    x9 , x0 , 2 	#n
Loop:
		bge     x5 , x9 , Result 
		slli    x5 , x5 , 3 
		addi    x5 , x5 , 1 
		jal     x0 , Loop
Result:
		addi    x24 , x0 , 0 
		bne     x5 , x24 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
