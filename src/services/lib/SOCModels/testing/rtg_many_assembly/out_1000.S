.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 111 
		addi    x16 , x0 , 32 
		addi    x29 , x0 , 176 
		bltu    x24 , x16 , Less_i 
		bgeu    x24 , x16 , Bigger_i 
Less_i:
		addi    x5 , x29 , 8 
		andi    x15 , x29 , 92 
		add     x15 , x15 , x5 
		srli    x15 , x15 , 3 
		addi    x26 , x0 , 25 
		bne     x15 , x26 , Fail 
Bigger_i:
		ori     x5 , x29 , 172 
		xori    x15 , x29 , 187 
		add     x15 , x15 , x5 
		srai    x15 , x15 , 3 
		addi    x26 , x0 , 24 
		bne     x15 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
