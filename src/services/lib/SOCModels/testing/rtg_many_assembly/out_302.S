.text

#The program finds the value of fibonacci 

Fibo:
		addi    x20 , x0 , 5 
		addi    x18 , x0 , 1 
		addi    x26 , x0 , 1 
		addi    x21 , x0 , 3 
		beq     x20 , x0 , Result0 
		beq     x20 , x26 , Result1 
Loop: 
		blt     x20 , x21 , Result 
		add     x27 , x18 , x26 
		addi    x18 , x26 , 0 
		addi    x26 , x27 , 0 
		addi    x21 , x21 , 1 
		jal     x0 , Loop 
Result0:
		addi    x27 , x0 , 0 
		addi    x19 , x0 , 0 
		bne     x27 , x19 , Fail 
Result1:
		addi    x27 , x0 , 1 
		addi    x4 , x0 , 1 
		bne     x27 , x4 , Fail 
Result:
		addi    x10 , x0 , 5 
		bne     x27 , x10 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
