.text

#The program checks the ALU instruction in I_type

Main:
		addi    x8 , x0 , 117 
		addi    x27 , x0 , 36 
		addi    x13 , x0 , 97 
		bltu    x8 , x27 , Less_i 
		bgeu    x8 , x27 , Bigger_i 
Less_i:
		addi    x14 , x13 , 131 
		andi    x16 , x13 , 168 
		add     x16 , x16 , x14 
		srli    x16 , x16 , 4 
		addi    x25 , x0 , 16 
		bne     x16 , x25 , Fail 
Bigger_i:
		ori     x14 , x13 , 135 
		xori    x16 , x13 , 112 
		add     x16 , x16 , x14 
		srai    x16 , x16 , 4 
		addi    x25 , x0 , 15 
		bne     x16 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
