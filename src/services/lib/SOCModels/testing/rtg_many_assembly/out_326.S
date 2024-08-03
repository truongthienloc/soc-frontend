.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 82 
		addi    x11 , x0 , 142 
		addi    x31 , x0 , 170 
		bltu    x26 , x11 , Less_i 
		bgeu    x26 , x11 , Bigger_i 
Less_i:
		addi    x27 , x31 , 59 
		andi    x16 , x31 , 20 
		add     x16 , x16 , x27 
		srli    x16 , x16 , 3 
		addi    x13 , x0 , 28 
		bne     x16 , x13 , Fail 
Bigger_i:
		ori     x27 , x31 , 35 
		xori    x16 , x31 , 52 
		add     x16 , x16 , x27 
		srai    x16 , x16 , 0 
		addi    x13 , x0 , 329 
		bne     x16 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
