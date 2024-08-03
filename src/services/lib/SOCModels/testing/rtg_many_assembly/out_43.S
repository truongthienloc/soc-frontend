.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 74 
		addi    x11 , x0 , 15 
		addi    x17 , x0 , 150 
		bltu    x16 , x11 , Less_i 
		bgeu    x16 , x11 , Bigger_i 
Less_i:
		addi    x25 , x17 , 72 
		andi    x5 , x17 , 163 
		add     x5 , x5 , x25 
		srli    x5 , x5 , 3 
		addi    x26 , x0 , 44 
		bne     x5 , x26 , Fail 
Bigger_i:
		ori     x25 , x17 , 134 
		xori    x5 , x17 , 45 
		add     x5 , x5 , x25 
		srai    x5 , x5 , 0 
		addi    x26 , x0 , 337 
		bne     x5 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
