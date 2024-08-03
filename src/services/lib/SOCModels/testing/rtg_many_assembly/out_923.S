.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x20 , x0 , x0 	#i
		addi    x5 , x0 , 1 	#Result
		addi    x6 , x0 , 9 	#x
		addi    x18 , x0 , 2 	#n
Loop:
		bge     x20 , x18 , Result 
		slli    x20 , x20 , 3 
		addi    x20 , x20 , 1 
		jal     x0 , Loop
Result:
		addi    x31 , x0 , 81 
		bne     x20 , x31 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
