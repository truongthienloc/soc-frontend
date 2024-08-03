.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 47 
		addi    x21 , x0 , 130 
		addi    x28 , x0 , 189 
		bltu    x19 , x21 , Less_i 
		bgeu    x19 , x21 , Bigger_i 
Less_i:
		addi    x20 , x28 , 158 
		andi    x1 , x28 , 60 
		add     x1 , x1 , x20 
		srli    x1 , x1 , 1 
		addi    x4 , x0 , 203 
		bne     x1 , x4 , Fail 
Bigger_i:
		ori     x20 , x28 , 30 
		xori    x1 , x28 , 52 
		add     x1 , x1 , x20 
		srai    x1 , x1 , 1 
		addi    x4 , x0 , 164 
		bne     x1 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
